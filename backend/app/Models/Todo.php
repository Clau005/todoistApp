<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    use HasFactory;
    protected $table = 'todoists';

    protected $fillable = [
        'title',
        'description',
        'user_id',
        'status',
        'due_date'
    ];

    public function user() : belongsTo
    {
        return $this->belongsTo(App\Models\User::class);
    }
    
}   
