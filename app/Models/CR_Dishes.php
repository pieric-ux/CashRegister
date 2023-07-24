<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CR_Dishes extends Model
{
    use HasFactory;

    protected $table = 'cr_dishes';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'unit',
        'client_price',
        'cost_price',
        'is_consigned',
        'fk_apps_id',
    ];

    public function cr_apps()
    {
        return $this->belongsTo(CR_App::class, 'fk_apps_id');
    }

    public function cr_products()
    {
        return $this->hasMany(CR_Products::class, 'fk_dishes_id');
    }
}
