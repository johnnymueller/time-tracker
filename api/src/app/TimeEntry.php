<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TimeEntry extends Model
{
    protected $fillable = ['task_id','duration','end_datetime'];

    public function tasks()
    {
        return $this->hasOne('App\Task');
        // test
    }
}