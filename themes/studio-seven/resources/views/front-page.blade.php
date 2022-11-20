@extends('layouts.app')

@php
  $field = get_field('slides', get_the_id());
  $data = Block::coverSlider($block['data'] = $field);
@endphp

@section('content')
  <div data-router-view="page">
    <div class="home">
      <div class="home-head">
        @include('blocks/cover-slider', ['data' => $data])
      </div>
      <div class="container-fluid">
        <div class="row">
          <div class="col-22 col-lg-15 offset-1">
            {!! the_content() !!}
          </div>
          <div class="col-24 col-lg-7 offset-1"></div>
        </div>
      </div>
    </div>
  </div>
@endsection
