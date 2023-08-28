<?php

namespace App\Http\Requests\Medias;

use App\Models\CR_Dishes;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UploadDishPictureRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Get the dish ID from the request input
        $dishId = $this->input('dishId');

        // Find the dish instance
        $dish = CR_Dishes::find($dishId);

        // Get the associated app of the dish
        $app = $dish->cr_apps;

        // Check if the app is owned by the authenticated user
        return $app->isOwnedBy(Auth::user());
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'picture' => ['required', 'image', 'mimes:png,jpg,webp', 'max:2048'],
        ];
    }
}
