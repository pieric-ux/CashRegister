<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CR_Products extends Model
{
    use HasFactory;

    protected $table = 'cr_products';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'description',
        'unit',
        'client_price',
        'cost_price',
        'fk_categories_products_id',
        'fk_dishes_id',
    ];

    public function cr_categories_products()
    {
        return $this->belongsTo(CR_Categories_Products::class, 'fk_categories_products_id');
    }

    public function cr_dishes()
    {
        return $this->belongsTo(CR_Dishes::class, 'fk_dishes_id');
    }

    public function cr_workstations()
    {
        return $this->belongsToMany(CR_Workstations::class, 'cr_workstations_products', 'fk_products_id', 'fk_workstations_id');
    }
}
