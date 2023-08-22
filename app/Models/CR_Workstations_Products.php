<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CR_Workstations_Products extends Model
{
    use HasFactory;

    protected $table = 'cr_workstations_products';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'fk_workstations_id',
        'fk_products_id',
    ];
}
