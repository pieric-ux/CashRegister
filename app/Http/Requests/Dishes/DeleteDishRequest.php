<?php

namespace App\Http\Requests\Dishes;

use App\Models\CR_Dishes;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class DeleteDishRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $dish = $this->route('dish');
        $dishes = $this->input('multipleDeleteDatas');

        if ($dish !== null) {
            $module = $dish->cr_modules;

            return $module->isOwnedBy(Auth::user());
        }

        if (count($dishes) > 0) {
            foreach($dishes as $dishData) {
                $dishId = $dishData['id'];
                $dish = CR_Dishes::find($dishId);

                $module = $dish->cr_modules;

                if(!$module->isOwnedBy(Auth::user())) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            //
        ];
    }
}
