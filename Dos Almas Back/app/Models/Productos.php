<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'clave',
    'nombre_producto',
    'descripcion',
    'precio',
    'disponible',
    'imagen',
    'recomendacion',
    'preferencia',
    'id_categoria'
])]
class Productos extends Model
{
    use HasFactory;

    /**
     * Nombre de la tabla asociada en la base de datos.
     */
    protected $table = 'productos';

    /**
     * La llave primaria asociada a la tabla.
     */
    protected $primaryKey = 'id_producto';

    /**
     * Indica si el modelo debe tener timestamps (created_at, updated_at).
     * Se define como false ya que no están presentes en tu migración.
     */
    public $timestamps = false;

    /**
     * Los atributos que deben ser casteados a tipos nativos.
     */
    protected function casts(): array
    {
        return [
            'precio' => 'decimal:2',
            'disponible' => 'boolean',
            'recomendacion' => 'boolean',
            'preferencia' => 'boolean',
        ];
    }

    /**
     * Obtiene la categoría a la que pertenece el producto.
     * Relación de Muchos a Uno (Foreign Key: id_categoria).
     */
    public function categoria(): BelongsTo
    {
        return $this->belongsTo(Categoria::class, 'id_categoria', 'id_categoria');
    }
}