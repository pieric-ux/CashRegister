<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CR_Categories_Products extends Model
{
    use HasFactory;

    protected $table = 'cr_categories_products';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'order',
        'fk_apps_id',
    ];

    // Relationship with CR_App model
    public function cr_apps()
    {
        return $this->belongsTo(CR_App::class, 'fk_apps_id');
    }

    // Relationship with CR_Products model
    public function cr_products()
    {
        return $this->hasMany(CR_Products::class, 'fk_categories_products_id');
    }
}
