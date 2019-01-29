<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = ['name'];

    // public function time_entry ()
    // {
    //     return $this->belongsTo('App\TimeEntry');
    // }
}
