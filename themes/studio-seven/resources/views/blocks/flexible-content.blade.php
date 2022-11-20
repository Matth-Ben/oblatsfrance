{{--
  Title: Contenu Flexible
  Description: Une ou deux colonnes : contenu / médias
  Category: template-blocks
  Icon: columns
  Post-Type: post page
  Keywords: contenu colonnes flexible image vidéo média
--}}

@php
  $data = Block::flexibleContent($block['data']);
@endphp

<section class="b-flexible-content">
  <div class="row align-items-stretch">
    @foreach ($data['components'] as $component)
      @php
        $col = '';

        if (count($data['components']) === 1) $col = 'subcol-md-15';
        if (count($data['components']) > 1 && $loop->index === 0) $col .= 'suboffset-md-2';
        if (count($data['components']) > 1) $col = $component['name'] === 'flexible-classic-content' ? 'subcol-lg-6 b-flexible-content__block' : 'subcol-lg-9 u-p0';
      @endphp
      <div class="subcol-xs-22 {{ $col }} @if($component['name'] !== 'flexible-classic-content' && count($data['components']) === 1){{ 'flexible-classic-media' }}@endif @if($component['name'] === 'flexible-classic-content'){{ 'u-o1' }}@else{{ 'u-o2' }}@endif">
        @include('components/' . $component['name'], ['data' => $component['data']])
      </div>
    @endforeach
  </div>
</section>
