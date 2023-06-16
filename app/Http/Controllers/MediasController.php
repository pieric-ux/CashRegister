<?php

namespace App\Http\Controllers;

use App\Http\Requests\Medias\UploadAvatarRequest;
use App\Models\CR_Media;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;

class MediasController extends Controller
{
    /**
     * Upload an avatar file.
     */
    public function uploadAvatar(UploadAvatarRequest $request, CR_Media $media): RedirectResponse
    {
        $file = $request->file('avatar');
        $name = $file->hashName();

        $user = auth()->user();
        $oldAvatar = $media::where('fk_customer_id', $user->id)
            ->where('collection', 'avatar')
            ->first();

        if ($oldAvatar) {
            Storage::disk('public')->delete($oldAvatar->path);
            $oldAvatar->delete();
        }

        Storage::disk('public')->put("media/avatar/", $file);

        $media::query()->create([
            'name' => $name,
            'file_name' => $file->getClientOriginalName(),
            'mime_type' => $file->getClientMimeType(),
            'path' => "media/avatar/{$name}",
            'disk' => 'public',
            'file_hash' => hash_file('sha256', $file->path()),
            'collection' => 'avatar',
            'size' => $file->getSize(),
            'fk_customer_id' => auth()->id(),
        ]);

        return redirect()->back();
    }
}
