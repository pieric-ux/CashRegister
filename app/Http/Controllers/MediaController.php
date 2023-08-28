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
        // Retrieve the authenticated customer
        $customer = auth()->user();

        if ($request->hasFile('avatar')) {
            $avatar = $request->file('avatar');
            // Call the 'uploadAvatar' method on the customer model
            $customer->uploadAvatar($avatar);
        }

        return redirect()->back();
    }

    /**
     * Upload an application's poster.
     */
    public function uploadPoster(UploadPosterRequest $request, CR_App $app): RedirectResponse
    {
        // Find the application based on the provided ID
        $app = $app::find($request->appId);

        if ($request->hasFile('poster')) {
            $poster = $request->file('poster');
            // Call the 'uploadPoster' method on the CR_App model
            $app->uploadPoster($poster);
        }

        return redirect()->back();
    }

    /**
     * Upload a product's picture.
     */
    public function uploadProductPicture(UploadProductPictureRequest $request, CR_Products $product): RedirectResponse
    {
        // Find the product based on the provided ID
        $product = $product::find($request->productId);

        if ($request->hasFile('picture')) {
            $picture = $request->file('picture');
            // Call the 'uploadProductPicture' method on the CR_Products model
            $product->uploadProductPicture($picture);
        }

        return redirect()->back();
    }

    /**
     * Upload a dish's picture.
     */
    public function uploadDishPicture(UploadDishPictureRequest $request, CR_Dishes $dish): RedirectResponse
    {
        // Find the dish based on the provided ID
        $dish = $dish::find($request->dishId);

        if ($request->hasFile('picture')) {
            $picture = $request->file('picture');
            // Call the 'uploadDishPicture' method on the CR_Dishes model
            $dish->uploadDishPicture($picture);
        }

        return redirect()->back();
    }

    /**
     * Upload an employee's avatar.
     */
    public function uploadEmployeeAvatar(UploadAvatarRequest $request, CR_Employees $employee): RedirectResponse
    {
        // Retrieve the authenticated employee
        $employee = auth('employee')->user();

        if ($request->hasFile('avatar')) {
            $avatar = $request->file('avatar');
            // Call the 'uploadAvatar' method on the CR_Employees model
            $employee->uploadAvatar($avatar);
        }

        return redirect()->back();
    }
}
