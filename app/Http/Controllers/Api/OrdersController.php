<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\OrderRequest;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Http\Resources\Api\Order as OrderResource;


class OrdersController extends Controller
{


    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index()
    {
        $orders = Order::all();

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

}
