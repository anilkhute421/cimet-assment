<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Models\PartnerPage;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class PartnerController extends Controller
{

    public function store(Request $request)
    {$request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:8',
    ]);

    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'role_id' => 2
    ]);
    
    return response()->json([]);
    }

    public function partners(Request $request){

    $user = User::where('role_id', 2)->get();
    
    return response()->json($user);
    }
    // Get all pages for a partner with overridden values
    public function getPages($partnerId) {
        $pages = Page::with('fields')->get();
        $partnerFields = PartnerPage::where('partner_id', $partnerId)->get();

        // Check if partner has overridden values
        foreach ($pages as $page) {
            foreach ($page->fields as $field) {
                $override = $partnerFields->where('field_id', $field->id)->first();
                $field->value = $override ? $override->value : 'Default Value';  // Default Master value if no override
            }
        }

        return response()->json($pages);
    }

    // Update field value for a partner
    public function updatePartnerPage(Request $request, $partnerId, $pageId) {
        $fieldId = $request->input('field_id');
        $value = $request->input('value');

        $partnerPage = PartnerPage::updateOrCreate(
            ['partner_id' => $partnerId, 'page_id' => $pageId, 'field_id' => $fieldId],
            ['value' => $value]
        );

        return response()->json($partnerPage);
    }
}
