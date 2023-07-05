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
}
