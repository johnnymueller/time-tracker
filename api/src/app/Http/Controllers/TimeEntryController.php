<?php

namespace App\Http\Controllers;

use App\TimeEntry;
use Illuminate\Http\Request;

class TimeEntryController extends Controller
{
    public function index()
    {
        // return TimeEntry::all();
        return TimeEntry::with('task')->get();
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

    public function update(Request $request, TimeEntry $TimeEntry)
    {
        $TimeEntry->update($request->all());

        return response()->json($TimeEntry);
    }

    public function delete(TimeEntry $TimeEntry)
    {
        $TimeEntry->delete();

        return response()->json(null, 204);
    }
}
