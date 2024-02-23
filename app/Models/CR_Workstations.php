<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CR_Workstations extends Model
{
    use HasFactory;

    protected $table = 'cr_workstations';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'fk_cr_modules_id',
    ];

    public function cr_modules()
    {
        return $this->belongsTo(CR_Module::class, 'fk_cr_modules_id');
    }

    public function cr_employees()
    {
        return $this->hasMany(CR_Employees::class, 'fk_workstations_id');
    }

    public function cr_products()
    {
        return $this->belongsToMany(CR_Products::class, 'cr_workstations_products', 'fk_workstations_id', 'fk_products_id')->orderBy('cr_workstations_products.order_products');
    }
}
