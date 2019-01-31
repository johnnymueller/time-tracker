<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TimeEntry extends Model
{
    protected $fillable = ['task_id','duration','end_datetime'];

    public function task()
    {
        return $this->belongsTo(Task::class);
    }
}
