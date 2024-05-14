<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\OrderRequest;
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
    /**
     * Store a newly created resource in storage.
     */
    public function store(OrderRequest $request)
    {
        $order = Order::create($request->validated());

        if (!$order) {
            return response()->json(['message' => 'Order not created'], 400);
        }

        return new OrderResource($order);
    }

    public function destroy($id)
    {
        $user = Auth::user();

        $order = Order::where('room_id',$id)->where('student_id', $user->id)->first();

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        $order->delete();

        return response()->json(['message' => 'Order deleted']);
    }
}
