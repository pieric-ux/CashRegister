<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Image\Manipulations;
use Spatie\MediaLibrary\MediaCollections\Models\Media;


class CR_PaymentMethods extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $table = 'cr_payment_methods';

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

    public function cr_transactions()
    {
        return $this->hasMany(CR_Transactions::class, 'fk_paymentMethods_id');
    }

    public function registerMediaConversions(Media $media = null): void
    {
        $this
            ->addMediaConversion('thumb')
            ->fit(Manipulations::FIT_CROP, 150, 150)
            ->format(Manipulations::FORMAT_PNG)
            ->nonQueued();
    }

    public function getPictureUrl($conversion = '')
    {
        $picture = $this->getFirstMediaUrl('paymentMethod-pictures', $conversion);

        return $picture;
    }

    public function uploadPaymentMethodPicture($picture)
    {
        $this->clearMediaCollection('paymentMethod-pictures');

        $this->addMedia($picture)
            ->usingFileName($picture->hashName())
            ->toMediaCollection('paymentMethod-pictures');
    }
}
