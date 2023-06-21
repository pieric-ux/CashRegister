<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CR_App extends Model
{
    use HasFactory;

    protected $table = 'cr_apps';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'poster',
        'name',
        'slug',
        'description',
        'start_date',
        'end_date',
        'location',
        'website',
        'fk_customer_id',
    ];

    public function customers()
    {
        return $this->belongsTo(Customer::class, 'fk_customer_id');
    }

    public function cr_medias()
    {
        return $this->hasMany(CR_Media::class, 'fk_app_id');
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }
}
