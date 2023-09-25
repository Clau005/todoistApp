<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'name',
        'team_id'
    ];

    // public function team() : BelongsTo 
    // {
    //        return $this->belongsTo(App\Models\Team::class);
    // }


}
