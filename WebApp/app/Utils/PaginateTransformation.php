<?php
// app/Utils/ResourceTransformation.php

namespace App\Utils;

use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;

class PaginateTransformation
{
    public static function getPaginateFromArray($items, $perPage = 2, $page = null)
    {
        $page = $page ?: (Paginator::resolveCurrentPage() ?: 1);
        $total = count($items);
        $currentpage = $page;
        $offset = ($currentpage * $perPage) - $perPage ;
        $itemstoshow = array_slice($items , $offset , $perPage);
        
        $paginator = new LengthAwarePaginator($itemstoshow, $total, $perPage);
        
        $path = 'http://localhost:8000/api';
        $paginator->setPath($path);

        return [
            'data' => $paginator->items(),
            'links' => [
                'self' => $paginator->url($paginator->currentPage()),
                'next' => $paginator->nextPageUrl(),
                'prev' => $paginator->previousPageUrl(),
            ],
            'meta' => [
                'current_page' => $paginator->currentPage(),
                'last_page' => $paginator->lastPage(),
                'per_page' => $paginator->perPage(),
                'total' => $paginator->total(),
            ]
        ];
    }
}
