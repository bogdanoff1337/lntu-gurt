<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Http\Resources\Api\Order as OrderResource;
use Illuminate\Support\Facades\Auth;


class OrdersController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $orders = Order::where('student_id', $user->id)->get();

        return OrderResource::collection($orders);
    }

    public function store(Request $request): OrderResource|JsonResponse
    {
        $order = Order::create($request->all());

        if (!$order) {
            return response()->json(['message' => 'Order not created'], 400);
        }

        return new OrderResource($order);
    }

    public function destroy($id): JsonResponse
    {
        $user = Auth::user();

        $order = Order::where('room_id', $id)
            ->where('student_id', $user->id)
            ->first();

        list($isBooked, $timeLeft) = $this->isBookedTime($order);

        if ($isBooked) {
            return response()->json([
                'message' => $timeLeft
            ], 403);
        }

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        $order->delete();

        return response()->json(['message' => 'Order deleted']);
    }

    private function isBookedTime($order): array
    {
        if ($order) {
            $now = Carbon::now();
            $orderCreationTime = $order->created_at;
            $minutesSinceLastOrder = $now->diffInMinutes($orderCreationTime);

            if ($minutesSinceLastOrder < 1) { // 2 години = 120 хвилин
                $timeLeft = 1 - $minutesSinceLastOrder;
                return [true, $timeLeft];
            }
        }

        return [false, 0];
    }
}
