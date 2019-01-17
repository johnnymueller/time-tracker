<?php

namespace App\Http\Controllers;

use App\Item;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    public function index()
    {
        return Item::all();
    }

    public function show(Item $Item)
    {
        return $Item;
    }

    public function store(Request $request)
    {
        $Item = Item::create($request->all());

        return response()->json($Item);
    }

    public function update(Request $request, Item $Item)
    {
        $Item->update($request->all());

        return response()->json($Item);
    }

    public function delete(Item $Item)
    {
        $Item->delete();

        return response()->json(null, 204);
    }
}
