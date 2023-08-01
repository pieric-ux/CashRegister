<?php

namespace App\Http\Controllers;

use App\Http\Requests\Medias\UploadAvatarRequest;
use App\Http\Requests\Medias\UploadPosterRequest;
use App\Http\Requests\Medias\UploadProductPictureRequest;
use App\Models\CR_App;
use App\Models\CR_Products;
use App\Models\Customer;
use Illuminate\Http\RedirectResponse;

class MediaController extends Controller
{
    public function uploadAvatar(UploadAvatarRequest $request, Customer $customer): RedirectResponse
    {
        $customer = auth()->user();

        if ($request->hasFile('avatar')) {
            $avatar = $request->file('avatar');
            $customer->uploadAvatar($avatar);
        }

        return redirect()->back();
    }

    public function uploadPoster(UploadPosterRequest $request, CR_App $app): RedirectResponse
    {
        $app = $app::find($request->appId);

        if ($request->hasFile('poster')) {
            $poster = $request->file('poster');
            $app->uploadPoster($poster);
        }

        return redirect()->back();
    }

    public function uploadProductPicture(UploadProductPictureRequest $request, CR_Products $product)
    {
        $product = $product::find($request->productId);

        if ($request->hasFile('picture')) {
            $picture = $request->file('picture');
            $product->uploadProductPicture($picture);
        }
        return redirect()->back();
    }
}
