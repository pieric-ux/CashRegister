<?php

namespace App\Http\Requests\Medias;

use App\Models\CR_App;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UploadPosterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $appId = $this->input('appId');

        $app = CR_App::find($appId);

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
            'poster' => ['required', 'image', 'mimes:png,jpg,webp', 'max:2048'],
        ];
    }
}
