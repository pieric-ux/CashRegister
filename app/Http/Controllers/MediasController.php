<?php

namespace App\Http\Controllers;

use App\Http\Requests\Medias\UploadAvatarRequest;
use App\Http\Requests\Medias\UploadPosterRequest;
use App\Models\CR_App;
use App\Models\Customer;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;

class MediasController extends Controller
{
    /**
     * Upload an avatar file.
     */
    public function uploadAvatar(UploadAvatarRequest $request, Customer $customer): RedirectResponse
    {
        $file = $request->file('avatar');
        $collection = "avatar";
        $path = "media/{$collection}/";
        $customer = auth()->user();

        $this->uploadImage($file, $collection, $path, $customer, 'avatar');

        return redirect()->back();
    }

    /**
     * Upload a poster file.
     */
    public function uploadPoster(UploadPosterRequest $request, CR_App $app): RedirectResponse
    {
        $file = $request->file('poster');
        $appId = $request->input('appId');
        $collection = "poster";
        $path = "media/{$collection}/";
        $app = $app->findOrFail($appId);

        $this->uploadImage($file, $collection, $path, $app, 'poster');

        return redirect()->back();
    }

    /**
     * Upload an image file.
     */
    private function uploadImage($file, $collection, $path, $model, $attribute): void
    {
        $name = $file->hashName();

        $this->deleteOldImage($model, $collection);
        $this->saveImageToDatabase($model, $name, $file, $path, $collection);
        $this->updateModelImageUrl($model, $attribute, $path, $name);
        $this->storeImageOnDisk($path, $file);
    }

    /**
     * Delete old image file.
     */
    private function deleteOldImage($model, $collection): void
    {
        $oldImage = $model->cr_medias()
            ->where('collection', $collection)
            ->first();

        if ($oldImage) {
            Storage::disk('public')->delete($oldImage->path);
            $oldImage->delete();
        }
    }

    /**
     * Save image file to database.
     */
    private function saveImageToDatabase($model, $name, $file, $path, $collection): void
    {
        $model->cr_medias()->create([
            'name' => $name,
            'file_name' => $file->getClientOriginalName(),
            'mime_type' => $file->getClientMimeType(),
            'path' => "{$path}{$name}",
            'disk' => 'public',
            'file_hash' => hash_file('sha256', $file->path()),
            'collection' => $collection,
            'size' => $file->getSize(),
        ]);
    }

    /**
     * Update Model image URL
     */
    private function updateModelImageUrl($model, $attribute, $path, $name)
    {
        $model->update([
            $attribute => Storage::url("{$path}{$name}"),
        ]);
    }

    /**
     * Store image on Disk
     */
    private function storeImageOnDisk($path, $file)
    {
        Storage::disk('public')->put($path, $file);
    }
}
