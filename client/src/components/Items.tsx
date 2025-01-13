import Item from './Item';

function Items(){
  return (
    <section>
            <h1 className='font-bold my-5'>Second-hand Stuff for You!</h1>

            <div className="list-of-items grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 my-5">

              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              

            </div>
            
    </section>
  );
}

export default Items;