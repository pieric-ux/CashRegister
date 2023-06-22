<?php

namespace App\Http\Controllers;

use App\Http\Requests\Medias\UploadImageRequest;
use App\Models\Customer;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class MediaController extends Controller
{
    public function uploadImage(UploadImageRequest $request, Customer $customer): RedirectResponse
    {
        $customer = auth()->user();

        if ($request->hasFile('avatar')) {
            $avatar = $request->file('avatar');
            $customer->uploadAvatar($avatar);
        }

        return redirect()->back();
    }
}
