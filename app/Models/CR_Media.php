<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CR_Media extends Model
{
    use HasFactory;

    protected $table = 'cr_medias';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'file_name',
        'mime_type',
        'path',
        'disk',
        'file_hash',
        'collection',
        'size',
        'fk_customer_id',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'fk_customer_id', 'id');
    }
}
