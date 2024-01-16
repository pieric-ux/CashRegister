<?php

namespace App\Http\Controllers;

use App\Http\Requests\Medias\UploadAvatarRequest;
use App\Http\Requests\Medias\UploadDishPictureRequest;
use App\Http\Requests\Medias\UploadPosterRequest;
use App\Http\Requests\Medias\UploadProductPictureRequest;
use App\Models\CR_App;
use App\Models\CR_Dishes;
use App\Models\CR_Employees;
use App\Models\CR_Products;
use App\Models\Customer;
use Illuminate\Http\RedirectResponse;

class MediaController extends Controller
{
    /**
     * Upload the customer's avatar.
     */
    public function uploadAvatar(UploadAvatarRequest $request, Customer $customer): RedirectResponse
    {
        $customer = auth()->user();

        if ($request->hasFile('avatar')) {
            $avatar = $request->file('avatar');
            $customer->uploadAvatar($avatar);
        }

        return redirect()->back();
    }

    /**
     * Upload an application's poster.
     */
    public function uploadPoster(UploadPosterRequest $request, CR_App $app): RedirectResponse
    {
        $app = $app::find($request->appId);

        if ($request->hasFile('poster')) {
            $poster = $request->file('poster');
            $app->uploadPoster($poster);
        }

        return redirect()->back();
    }

    /**
     * Upload a product's picture.
     */
    public function uploadProductPicture(UploadProductPictureRequest $request, CR_Products $product): RedirectResponse
    {
        $product = $product::find($request->itemId);

        if ($request->hasFile('picture')) {
            $picture = $request->file('picture');
            $product->uploadProductPicture($picture);
        }

        return redirect()->back();
    }

    /**
     * Upload a dish's picture.
     */
    public function uploadDishPicture(UploadDishPictureRequest $request, CR_Dishes $dish): RedirectResponse
    {
        $dish = $dish::find($request->itemId);

        if ($request->hasFile('picture')) {
            $picture = $request->file('picture');
            $dish->uploadDishPicture($picture);
        }

        return redirect()->back();
    }

    /**
     * Upload an employee's avatar.
     */
    public function uploadEmployeeAvatar(UploadAvatarRequest $request, CR_Employees $employee): RedirectResponse
    {
        $employee = auth('employee')->user();

        if ($request->hasFile('avatar')) {
            $avatar = $request->file('avatar');
            $employee->uploadAvatar($avatar);
        }

        return redirect()->back();
    }
}
