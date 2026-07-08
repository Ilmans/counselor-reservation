<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class ProfileSettingController extends Controller
{
    public function index()
    {
        return inertia('profilesetting/index');
    }


    public function update(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'name'     => ['required', 'string', 'max:255'],
            'email'    => ['required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
            'whatsapp' => ['nullable', 'string', 'max:20'],
            'age'      => ['nullable', 'integer', 'min:0', 'max:150'],
            'gender'   => ['nullable', Rule::in(['L', 'P'])],
            'avatar'   => ['nullable', 'image', 'mimes:jpg,jpeg,png', 'max:2048'],
        ]);


        if ($request->hasFile('avatar')) {
            if ($user->avatar_path) {
                Storage::disk('public')->delete($user->avatar_path);
            }
            $validated['avatar_path'] = $request->file('avatar')->store('avatars', 'public');
        }
        unset($validated['avatar']);
        $user->update($validated);
        return back()->with('alert', [
            'type' => 'success',
            'message' => 'Detail profile berhasil diperbarui.'
        ]);
    }
}
