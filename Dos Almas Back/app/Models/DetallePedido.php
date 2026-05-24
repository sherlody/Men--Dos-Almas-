<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['id_pedido', 'id_producto', 'cantidad', 'precio_unitario'])]
class DetallePedido extends Model
{
    use HasFactory;

    // Nombre de la tabla
    protected $table = 'detalles_pedido';

    // Llave primaria
    protected $primaryKey = 'id_detalle';

    // Desactivar timestamps
    public $timestamps = false;

    // --- NUEVA RELACIÓN ---

    // Cada detalle (línea del ticket) corresponde a un producto específico
    public function producto()
    {
        return $this->belongsTo(Productos::class, 'id_producto', 'id_producto');
    }
}