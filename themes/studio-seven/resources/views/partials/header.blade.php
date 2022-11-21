<header class="header">
  <div class="header-top">
    <div class="container-fluid">
      <div class="row">
        <div class="header-top__wrapper">
          <a href="{{ home_url() }}" aria-label="Accueil" class="header-top__logo">
            @include('elements/image', ['data' => $GLOBALS['options']['header']['logo']])
          </a>
          <div class="header-top__toggler">
            <span style="--transition-order: 0"></span>
            <span style="--transition-order: 1"></span>
            <span style="--transition-order: 2"></span>
            <div style="--transition-order: 0"></div>
            <div style="--transition-order: 1"></div>
          </div>
          <div class="header-top__nav ">
            <a class="login body-sm" href="{!! $GLOBALS['options']['header']['button']['url'] !!}">{!! $GLOBALS['options']['header']['button']['title'] !!}</a>
            <a class="login body-sm" href="{!! $GLOBALS['options']['header']['login']['url'] !!}">{!! $GLOBALS['options']['header']['login']['title'] !!}</a>
            <div class="search">
              <div style="--transition-order: 0"></div>
              <div style="--transition-order: 1"></div>
              {{-- {{ display_svg('search') }} --}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="header-nav">
    <div class="container-fluid">
      <div class="row">
        <div class="header-nav__list">
          @foreach ($GLOBALS['navigation']['primary_navigation'] as $item)
            <div class="header-nav__item">
              <a href="{{ $item['url'] }}" class="header-nav__item-link">
                {!! $item['title'] !!}
              </a>
            </div>
          @endforeach
        </div>
        <div class="header-nav__nav">
          <div class="search">
            <div style="--transition-order: 0"></div>
            <div style="--transition-order: 1"></div>
            {{-- {{ display_svg('search') }} --}}
          </div>
          <a class="login" href="{!! $GLOBALS['options']['header']['button']['url'] !!}"><span class="login-label">{!! $GLOBALS['options']['header']['button']['title'] !!}</span></a>
          <a class="login" href="{!! $GLOBALS['options']['header']['login']['url'] !!}"><span class="login-label">{!! $GLOBALS['options']['header']['login']['title'] !!}</span></a>
        </div>
      </div>
    </div>
  </div>
  <div class="header-search">
    <form role="search" method="get" class="header-search__form" action="{{ esc_url( home_url( '/' ) ) }}">
      <input type="search" class="header-search__form-field" placeholder={{ __('Mots-clés', '') }} value="" name="s">
      <div class="header-search__form-button">
        <input type="submit" class="header-search__form-button__submit" value="OK">
      </div>
    </form>
  </div>
</header>
