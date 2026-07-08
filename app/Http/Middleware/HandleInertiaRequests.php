<?php

namespace App\Http\Middleware;

use App\Repositories\CounselorRepository;
use App\Support\AppContext;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache as FacadesCache;
use Illuminate\Support\Facades\Storage;
use Inertia\Middleware;
use Pest\Plugins\Cache;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $repo = app(CounselorRepository::class);

        $categories = $repo->getAllCategories();
        $specializations = $repo->getAllSpecialization();


        return [
            ...parent::share($request),
            'app' => AppContext::make(),
            'auth' => [
                'user' => fn() => $request->user()
                    ? tap(
                        $request->user()->loadMissing([
                            'counselor.specialization:id,name',
                        ]),
                        function ($user) {
                            $user->avatar_url = $user->avatar_path
                                ? Storage::disk('public')->url($user->avatar_path)
                                : null;
                            $user->counselor->photo = $user->counselor->photo_url ?   Storage::disk('public')->url($user->counselor->photo_url)
                                : null;
                        }
                    )
                    : null,
            ],
            'categories' => $categories,
            'specializations' => $specializations,
            'alert' => fn() => $request->session()->get('alert'),
            'toast' => fn() => $request->session()->get('toast'),
        ];
    }
}
