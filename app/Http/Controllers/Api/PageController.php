<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Field;
use App\Models\Page;
use Illuminate\Http\Request;

class PageController extends Controller
{
    // Create a new CMS Page
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'slug' => 'required|unique:pages,slug',
        ]);

        $page = Page::create($validated);
        return response()->json($page);
    }

    // Create a new CMS Page
    public function pageTitle(Request $request)
    {
        $page = Page::get();
        return response()->json($page);
    }

    // public function fieldsList(Request $request)
    // {
    //     $page = Page::select('id', 'title')->get();
    //     return response()->json($page);
    // }

    // Add fields to the page
    public function addField(Request $request)
    {
        // Validation rules
        $rules = [
            'pageTitle' => 'required',
            'fields' => 'required|array',
            'fields.*.label' => 'required|string|max:255',
            'fields.*.field_type' => 'required|in:text,textarea,radio,checkbox',
            'fields.*.validation.required' => 'boolean',
            'fields.*.validation.minLength' => 'nullable|integer|min:1',
            'fields.*.validation.maxLength' => 'nullable|integer|min:1',
        ];

        // Custom error messages
        $messages = [
            'fields.*.label.required' => 'The label field is required.',
            'fields.*.field_type.required' => 'The field type is required.',
        ];

        // Validate the request with custom messages
        $request->validate($rules, $messages);


        // Create the Fields for the Page
        foreach ($request->input('fields') as $field) {
            Field::create([
                'page_id' => $request->pageTitle,
                'label' => $field['label'],
                'field_type' => $field['field_type'],
                'validation_rules' => json_encode($field['validation']),
            ]);
        }

        return response()->json(['message' => 'Page fields created successfully'], 201);
    }
}
