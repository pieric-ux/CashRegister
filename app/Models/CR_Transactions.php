<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CR_Transactions extends Model
{
    use HasFactory;

    protected $table = 'cr_transactions';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'or_number',
        'employee',
        'workstation',
        'total',
        'fk_paymentMethods_id',
    ];

    public function cr_payment_methods()
    {
        return $this->belongsTo(CR_PaymentMethods::class, 'fk_paymentMethods_id');
    }

    public function cr_details_transactions()
    {
        return $this->hasMany(CR_Details_Transactions::class, 'fk_transactions_id');
    }
}
