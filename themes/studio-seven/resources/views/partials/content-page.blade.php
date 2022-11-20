@php
  $field = get_fields(get_the_id());
  $data = Block::cover($block['data'] = $field);
@endphp

<div class="page" data-router-view="page">
  @if ($data)
    <div class="page-head">
      @include('blocks/cover', ['data' => $data])
    </div>
  @endif

  <div class="container-fluid">
    <div class="row">
      <div class="col-24 col-lg-18">{!! the_content() !!}</div>
      <div class="col-24 col-lg-6"></div>
    </div>
  </div>
</div>
