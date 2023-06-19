<?php

namespace App\Http\Controllers;

use App\Http\Requests\Medias\UploadAvatarRequest;
use App\Http\Requests\Medias\UploadPosterRequest;
use App\Models\CR_App;
use App\Models\CR_Media;
use App\Models\Customer;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;

class MediasController extends Controller
{
    /**
     * Upload an avatar file.
     */
    public function uploadAvatar(UploadAvatarRequest $request, Customer $customer, CR_Media $media): RedirectResponse
    {
        $file = $request->file('avatar');

        $name = $file->hashName();
        $collection = "avatar";
        $path = "media/{$collection}/";

        $user = auth()->user();
        $oldAvatar = $media::where('fk_customer_id', $user->id)
            ->where('collection', $collection)
            ->first();

        if ($oldAvatar) {
            Storage::disk('public')->delete($oldAvatar->path);
            $oldAvatar->delete();
        }

        $media::create([
            'name' => $name,
            'file_name' => $file->getClientOriginalName(),
            'mime_type' => $file->getClientMimeType(),
            'path' => "{$path}{$name}",
            'disk' => 'public',
            'file_hash' => hash_file('sha256', $file->path()),
            'collection' => $collection,
            'size' => $file->getSize(),
            'fk_customer_id' => $user->id,
        ]);

        $customer::where('id', $user->id)->update([
            'avatar' => Storage::url("{$path}{$name}"),
        ]);

        Storage::disk('public')->put($path, $file);

        return redirect()->back();
    }

    /**
     * Upload a poster file.
     */
    public function uploadPoster(UploadPosterRequest $request, CR_App $app, CR_Media $media): RedirectResponse
    {
        $file = $request->file('poster');
        $appId = $request->input('appId');

        $name = $file->hashName();
        $collection = "poster";
        $path = "media/{$collection}/";

        $oldPoster = $media::where('fk_app_id', $appId)
            ->where('collection', $collection)
            ->first();

        if ($oldPoster) {
            Storage::disk('public')->delete($oldPoster->path);
            $oldPoster->delete();
        }

        $media::create([
            'name' => $name,
            'file_name' => $file->getClientOriginalName(),
            'mime_type' => $file->getClientMimeType(),
            'path' => "{$path}{$name}",
            'disk' => 'public',
            'file_hash' => hash_file('sha256', $file->path()),
            'collection' => $collection,
            'size' => $file->getSize(),
            'fk_app_id' => $appId,
        ]);

        $app::where('id', $appId)->update([
            'poster' => Storage::url("{$path}{$name}"),
        ]);

        Storage::disk('public')->put($path, $file);

        return redirect()->back();
    }
}
