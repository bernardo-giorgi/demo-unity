export default function singleton(Target) {

  //static instance getter method
  Target.getInstance = function (...args) {

    // save a reference to the original constructor
    let target = Target;

    // a utility function to generate instance of a class
    function construct(constructor) {
      const instance = function () {

        return constructor.apply(this, args);
      }
      instance.prototype = constructor.prototype;

      return new instance();
    }

    //new constructor
    const object = function () {

      return construct(target);
    }
    if (!target.instance) {

      // copy prototype so intanceof operator still works
      object.prototype = target.prototype;
      target.instance = new object();
    }

    return target.instance;
  }
}