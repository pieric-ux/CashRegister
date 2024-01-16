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
        $dishId = $this->input('itemId');

        $dish = CR_Dishes::find($dishId);

        $app = $dish->cr_apps;

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
