{{--
  Title: Cover Slider
  Description: Image et contenu slider
  Category: template-blocks
  Icon: slides
  Post-Type: page post
  Keywords: image contenu cover slider
--}}

@php
  $data = Block::coverSlider($block['data']);
@endphp

<section class="b-cover-slider">
  <div class="container-fluid u-h100">
    <div class="row u-h100">
      <div class="col-24">
        <div class="b-cover-slider__imgs">
          @foreach ($data['slides'] as $repeater)
            <div class="b-cover-slider__imgs-item">
              <div class="wrapper">
                <div class="u-h100">
                  @include('elements/image', ['data' => $repeater['image']])
                </div>
              </div>
            </div>
          @endforeach
        </div>
        <div class="row">
          <div class="b-cover-slider__wrapper">
            <div class="b-cover-slider__items">
              @foreach ($data['slides'] as $repeater)
                <div class="b-cover-slider__item @if($loop->index === 0){{ 'active' }}@endif">
                  <div class="b-cover-slider__item-content">
                  @if(!empty($repeater['title']))
                    <div class="b-cover-slider__item-content-title">
                      <@if ($loop->index === 0){{'h1'}}@else{{'h2'}}@endif class="e-title">{!! $repeater['title'] !!}</@if ($loop->index === 0){{'h1'}}@else{{'h2'}}@endif>
                    </div>
                  @endif

                  @if(!empty($repeater['content']))
                    <div class="b-cover-slider__item-content-content">
                      {!! wpautop($repeater['content']) !!}
                    </div>
                  @endif

                  @if(!empty($repeater['button']))
                    <div class="b-cover-slider__item-content-button">
                      <a href="{{ $repeater['button']['url'] }}" class="button" @if($repeater['button']['target']){{ 'target="_blank" rel="noopener"' }}@endif>
                        {!! $repeater['button']['title'] !!}
                      </a>
                    </div>
                  @endif

                  </div>
                </div>
              @endforeach
            </div>
          </div>
        </div>
        @if (count($data['slides']) > 1)
          <div class="b-cover-slider__nav">
            <div class="b-cover-slider__nav-left disabled">{{ display_svg('arrow') }}</div>
            <div class="b-cover-slider__nav-right">{{ display_svg('arrow') }}</div>
          </div>
        @endif
      </div>
    </div>
  </div>
</section>
