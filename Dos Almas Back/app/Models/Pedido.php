<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['id_mesa', 'estado', 'total'])]
class Pedido extends Model
{
    use HasFactory;

    protected $table = 'pedidos';
    protected $primaryKey = 'id_pedido';
    
    // Desactivamos los timestamps si no pusiste $table->timestamps() en tu migración
    public $timestamps = false;

    // --- NUEVAS RELACIONES ---

    // Un pedido tiene muchos detalles (productos en el carrito)
    public function detalles()
    {
        return $this->hasMany(DetallePedido::class, 'id_pedido', 'id_pedido');
    }

    // Un pedido pertenece a una mesa física
    public function mesa()
    {
        return $this->belongsTo(Mesa::class, 'id_mesa', 'id_mesa');
    }
}