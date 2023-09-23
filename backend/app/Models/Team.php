<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    use HasFactory;


    protected $fillable = [
        'name'
    ];

    public function project() : hasMany 
    {
           return $this->hasMany(App\Models\Project::class);
    }

    public function user(): hasMany
    {
        return $this->hasMany(App\Models\User::class);
    }
}
