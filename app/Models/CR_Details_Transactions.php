<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CR_Details_Transactions extends Model
{
    use HasFactory;

    protected $table = 'cr_details_transactions';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'quantity',
        'item_name',
        'unit',
        'client_price',
        'fk_transactions_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'fk_transactions_id',
    ];

    public function cr_transactions()
    {
        return $this->belongsTo(CR_Transactions::class, 'fk_transactions_id');
    }
}
