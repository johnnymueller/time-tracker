<?php

namespace App\Http\Controllers;

use App\TimeEntry;
use Illuminate\Http\Request;

class TimeEntryController extends Controller
{
    public function index()
    {
        // return TimeEntry::all();
        // return TimeEntry::with('task')->get();
        $entries = [];
        foreach(TimeEntry::with('task')->get() as $entry) {
            $entry['task_name'] = $entry['task']['name'];
            unset($entry['task']);
            $entries[] = $entry;
        }
        return $entries;
    }

    public function show(TimeEntry $TimeEntry)
    {
        return $TimeEntry;
    }

    public function store(Request $request)
    {
        $TimeEntry = TimeEntry::create($request->all());

        return response()->json($TimeEntry);
    }

    public function update(Request $request, TimeEntry $timeEntry)
    {
        $timeEntry->update($request->all());

        return response()->json($timeEntry);
    }

    public function delete(TimeEntry $timeEntry)
    {
        $timeEntry->delete();

        return response()->json(null, 204);
    }
}
