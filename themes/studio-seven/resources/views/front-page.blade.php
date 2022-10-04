@extends('layouts.app')

@section('content')
  <div data-router-view="page">
    <div class="home">
      {!! the_content() !!}
    </div>
  </div>
@endsection
