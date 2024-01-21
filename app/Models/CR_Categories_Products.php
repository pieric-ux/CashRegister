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
        'fk_cr_modules_id',
    ];

    public function cr_modules()
    {
        return $this->belongsTo(CR_Module::class, 'fk_cr_modules_id');
    }

    public function cr_products()
    {
        return $this->hasMany(CR_Products::class, 'fk_categories_products_id');
    }
}
