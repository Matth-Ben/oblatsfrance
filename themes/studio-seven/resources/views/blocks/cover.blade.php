{{--
  Title: Cover
  Description: Cover
  Category: template-blocks
  Icon: cover-image
  Post-Type: post page
  Keywords: cover
--}}

@php
  $data = Block::cover($block['data']);
@endphp

<section class="b-cover">
  <div class="b-cover__content">
    <div class="container-fluid">
      <div class="row">
        <div class="b-cover__body">
          <div class="b-cover__item">
            <div class="b-cover__item-background">
              @include('elements/image', ['data' => $data['image']])
            </div>
            <div class="b-cover__item-content">
              @if ($data['display'])
                <div class="b-cover__item-breadcrumb">
                  @php do_shortcode('[wpseo_breadcrumb]') @endphp
                </div>
              @endif
              <h1 class="b-cover__item-title e-title">
                {!! $data['title'] !!}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
