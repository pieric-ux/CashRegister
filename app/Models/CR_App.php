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
        'name',
        'fk_customer_id',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'fk_customer_id', 'id');
    }
}
