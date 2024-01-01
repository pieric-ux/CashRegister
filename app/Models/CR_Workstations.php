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
        'fk_apps_id',
    ];

    public function cr_apps()
    {
        return $this->belongsTo(CR_App::class, 'fk_apps_id');
    }

    public function cr_employees()
    {
        return $this->hasMany(CR_Employees::class, 'fk_workstations_id');
    }

    public function cr_products()
    {
        return $this->belongsToMany(CR_Products::class, 'cr_workstations_products', 'fk_workstations_id', 'fk_products_id');
    }
}
