<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\Room\Short;
use App\Models\Faculty;
use Illuminate\Http\Request;
use App\Models\Room;
use App\Http\Resources\Api\Room\Full;
use Illuminate\Http\Resources\Json\JsonResource;
class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResource
    {
        $rooms = Room::query()
            ->when($request->id, function ($query, $id) {
                return $query->where('id', $id);
            })
            ->when($request->faculty_id, function ($query, $faculty_id) {
                return $query->where('faculty_id', $faculty_id);
            })
            ->when($request->dormitory_id, function ($query, $dormitory_id) {
                return $query->where('dormitory_id', $dormitory_id);
            })
            ->when($request->gender, function ($query, $gender) {
                return $query->where('gender', $gender);
            });
        
        $breadcrumbs = Faculty::where('id', $request->faculty_id)->get('slug_short')->first();

        return $this->getPaginatePage($rooms,$breadcrumbs);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResource
    {
        $room = Room::findOrFail($id);

        return new Full($room);
    }

    private function getPaginatePage($rooms,$breadcrumbs) : JsonResource
    {
        $total = $rooms->count();

        $rooms = $rooms->limit(12)->get();

        $currentPage = 1;
        $perPage = 12;
        $lastPage = (int) ceil($total / $perPage);

        return Short::collection($rooms)
            ->additional(
            [
            'breadcrumbs' => $breadcrumbs,
            'meta' => [
                'current_page' => $currentPage,
                'per_page' => $perPage,
                'total' => $total,
                'last_page' => $lastPage,
            ]]
        );
    }
}
